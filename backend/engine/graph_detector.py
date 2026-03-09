import networkx as nx
import pandas as pd


def detect_graph_patterns(df: pd.DataFrame):
    """Constructs a bipartite graph of customers and merchants.

    Edges represent transactions. Suspicious patterns include:
    * nodes with unusually high degree
    * tightly connected clusters (small components with many edges)
    * high betweenness centrality indicating hub accounts

    Returns a dictionary summarizing suspicious accounts and clusters.
    """
    # expect columns 'customer_id' and 'merchant_id'
    if not {"customer_id", "merchant_id"}.issubset(df.columns):
        raise ValueError("DataFrame must have customer_id and merchant_id columns")

    G = nx.Graph()
    # add nodes as bipartite sets
    customers = df["customer_id"].unique()
    merchants = df["merchant_id"].unique() if "merchant_id" in df.columns else []
    G.add_nodes_from(customers, bipartite="customer")
    G.add_nodes_from(merchants, bipartite="merchant")

    # add edges for each transaction
    for _, row in df.iterrows():
        G.add_edge(row["customer_id"], row.get("merchant_id", ""))

    suspicious = {"high_degree": [], "clusters": [], "high_betweenness": []}

    # degree analysis
    degrees = dict(G.degree())
    if degrees:
        avg_deg = sum(degrees.values()) / len(degrees)
        threshold = avg_deg * 3  # arbitrary multiplier
        suspicious["high_degree"] = [node for node, deg in degrees.items() if deg > threshold]

    # connected components - look for small but dense ones
    for comp in nx.connected_components(G):
        if 2 <= len(comp) <= 10:  # small component
            sub = G.subgraph(comp)
            # density = 2*edges/(n*(n-1))
            n = sub.number_of_nodes()
            e = sub.number_of_edges()
            density = (2 * e) / (n * (n - 1)) if n > 1 else 0
            if density > 0.5:
                suspicious["clusters"].append({"members": list(comp), "density": density})

    # betweenness centrality
    bc = nx.betweenness_centrality(G)
    if bc:
        avg_bc = sum(bc.values()) / len(bc)
        suspicious["high_betweenness"] = [node for node, val in bc.items() if val > avg_bc * 2]

    return suspicious

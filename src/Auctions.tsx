import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { listAuctions } from "./graphql/queries";
import { ListAuctionsQuery, ListAuctionsQueryVariables } from "./API";
import AuctionCard from "./AuctionCard";

export const Auctions = () => {
  return (
    <Query<ListAuctionsQuery, ListAuctionsQueryVariables>
      query={gql(listAuctions)}
      variables={{ limit: 10 }}
      fetchPolicy="cache-and-network"
    >
      {({ data, loading }) => {
        if (
          loading ||
          !data ||
          !data.listAuctions ||
          !data.listAuctions.items
        ) {
          return null;
        }
        // return <div>{JSON.stringify(data.listAuctions.items)}</div>;
        // grid-gap: espacio
        // grid-template-columns: numero de columnas y la division
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridGap: 10
              //   gridAutoRows: "minmax(100px, auto)"
            }}
          >
            {data.listAuctions.items.map(auction => (
              <AuctionCard
                key={auction!.id}
                name={auction!.name}
                price={auction!.price}
              />
            ))}
          </div>
        );
      }}
    </Query>
  );
};

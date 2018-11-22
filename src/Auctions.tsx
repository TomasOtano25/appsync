import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { buildSubscription } from "aws-appsync";

import { listAuctions } from "./graphql/queries";
import { ListAuctionsQuery, ListAuctionsQueryVariables } from "./API";
import AuctionCard from "./AuctionCard";
import { OnMount } from "./components/OnMount";
import { onCreateAuction } from "./graphql/subscriptions";

export const Auctions = () => {
  return (
    <Query<ListAuctionsQuery, ListAuctionsQueryVariables>
      query={gql(listAuctions)}
      variables={{ limit: 10 }}
      fetchPolicy="cache-and-network"
    >
      {({ data, loading, subscribeToMore }) => {
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
            <OnMount
              onEffect={() => {
                // const unsubscribe = subscribeToMore();
                // return unsubscribe;
                // return () => unsubscribe();
                return subscribeToMore(
                  buildSubscription(gql(onCreateAuction), gql(listAuctions))
                );
              }}
            />

            {data.listAuctions.items.map(auction => (
              <AuctionCard
                key={auction!.id}
                name={auction!.name}
                price={auction!.price}
                image={auction!.file}
              />
            ))}
          </div>
        );
      }}
    </Query>
  );
};

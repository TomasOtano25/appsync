// rpc
// ctrl + espacio
// rh
import * as React from "react";
import { Formik } from "formik";
import { Mutation } from "react-apollo";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import { produce } from "immer";

import {
  CreateAuctionMutation,
  CreateAuctionMutationVariables,
  ListAuctionsQuery
} from "./API";
import { createAuction } from "./graphql/mutations";
import { listAuctions } from "./graphql/queries";
import { UploadFile } from "./UploadFile";

interface FormValues {
  name: string;
  price: number;
  file: string | null;
}

export const CreateAuctionForm = () => {
  return (
    <Mutation<CreateAuctionMutation, CreateAuctionMutationVariables>
      mutation={gql(createAuction)}
    >
      {createAuction => (
        <Formik<FormValues>
          initialValues={{ name: "", price: 0, file: null }}
          onSubmit={async ({ name, price, file }, { resetForm }) => {
            console.log(
              "name: " + name + ", price: " + price,
              ", file:" + file
            );
            //call mutation
            const response = await createAuction({
              variables: {
                input: {
                  name,
                  price,
                  file
                }
              },
              optimisticResponse: {
                createAuction: {
                  __typename: "Auction",
                  id: "-1",
                  name,
                  price,
                  file
                }
              },
              update: (store, { data }) => {
                if (!data || !data.createAuction) {
                  return;
                }
                const auctions = store.readQuery<ListAuctionsQuery>({
                  query: gql(listAuctions),
                  variables: { limit: 10 }
                });

                // console.log(
                //   produce(auctions, ds => {
                //     ds!.listAuctions!.items!.push(data.createAuction);
                //   })
                // );

                store.writeQuery({
                  query: gql(listAuctions),
                  variables: { limit: 10 },
                  data: produce(auctions, ds => {
                    ds!.listAuctions!.items!.unshift(data.createAuction);
                  })
                });
              }

              // refetchQueries: [
              //   { query: gql(listAuctions), variables: { limit: 10 } }
              // ]
            });

            resetForm();
            console.log(response);
          }}
        >
          {({ values, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <TextField
                name="name"
                label="Name"
                // className={classes.textField}
                value={values.name}
                onChange={handleChange}
                margin="normal"
              />
              <br />
              <TextField
                name="price"
                label="Price"
                // className={classes.textField}
                value={values.price}
                onChange={handleChange}
                margin="normal"
              />
              <UploadFile
                handleFile={async (file: string) => {
                  await setFieldValue("file", file);
                  console.log(file);
                }}
              />
              <br />
              <Button type="submit" variant="contained" color="default">
                Submit
              </Button>
            </form>
          )}
        </Formik>
      )}
    </Mutation>
  );
};

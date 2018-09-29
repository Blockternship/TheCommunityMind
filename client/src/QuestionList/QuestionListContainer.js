/**
 * Created by will on 29/09/18.
 */
import React from 'react';
import Query from 'react-apollo';
import gql from 'graphql-tag'

const GET_QUESTIONS = gql`
    {
        questions {
            
        }
    }
`;
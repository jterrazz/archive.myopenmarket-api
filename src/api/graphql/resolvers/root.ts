import apmClient from '~/services/elastic-apm';

// Called for every request
const rootLevelResolver = async (root, args, context, info) => {
    const path = info.path;
    const transactionName = `GRAPHQL /${path.typename}/${path.key}`;

    apmClient.setTransactionName(transactionName);
    apmClient.setCustomContext({
        graphql: {
            args,
        },
    });
};

export default rootLevelResolver;

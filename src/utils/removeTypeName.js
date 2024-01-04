const omitTypename = (key, value) => (key === '__typename' ? undefined : value);

export default obj => JSON.parse(JSON.stringify(obj), omitTypename);

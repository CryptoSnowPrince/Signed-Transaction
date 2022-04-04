const config = {
    test: {
        3: '0x3981eEdcEC28A43Fc8b3d2890E1D2A6d7d43bDcC',
        4: '0x60364a0aD95c2146470d09ACb6B40a3474575264',
        56: '0xD5Cec3e357A8752C38f99A1541ac8b34A010fC8A',
        97: '0xE1206Db2db4C8437546b34d1f7DcE7365D86db89',
    },
    rpc: {
        wss: {
            1: "wss://mainnet.infura.io/ws/v3/9254bae6432742babcfc7d367c7e77cd",
        },
        https: {
            3: "https://ropsten.infura.io/v3/2b400873a26747b694c7075796523b3d",
            4: "https://rinkeby.infura.io/v3/2b400873a26747b694c7075796523b3d",
            56: "https://bsc-dataseed1.defibit.io/",
            97: "https://data-seed-prebsc-2-s3.binance.org:8545/",
        },
    },
    DEFAULT_GAS_PRICE: 100000000000,
    chainID: 97,
};

export default config;

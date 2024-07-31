module.exports = {
    transform: {
        "^.+\\.(ts|tsx)$": "babel-jest"
    },
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
};

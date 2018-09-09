# Welcome to Welandam protocol adapted version of Cezerin Ecommere framework

[Welandam protocol](https://docs.google.com/document/d/1su1q2kxaIbKtZXeVIcCiuMpLVtNRJP8yU8rpFYmzS2Y/edit?usp=sharing) aims to 
support decentralization of ecommerce through a smart contract and a network of relayers. Cezerin is going to be first relayer software that 
we support with more ecommerce frameworks like Magento, Woocommerce to be supported later. Following are the changes we have made here.

1. Buy button submits a transaction to the [Welandam smart contract](https://github.com/welandam/cezerin/blob/master/contracts/Welandam.sol) with itemId, value and a set of addresses by shipper, seller, relayer and the customer, check [relevant code](https://github.com/welandam/cezerin/blob/master/src/store/shared/actions.js#L123) .
2. When a product item is added to Cezerin by a merchant its relayed to other relayers in the network(current does not work correctly) [check relevant code](https://github.com/welandam/cezerin/blob/master/src/api/server/services/products/products.js#L201). 
3. At some point an integration with [Dutchex](https://github.com/gnosis/dx-contracts) was tried out [here](https://github.com/welandam/cezerin/pull/4/files).

## How to interact with Welandam smart contract

1. The Welandam Smart contract is deployed at `0x6e54f75413ddaf374188fd16b8e0888fee76715e` on Rinkeby network.
2. Use remix to interact with it by using the address and the code at [Welandam smart contract](https://github.com/welandam/cezerin/blob/master/contracts/Welandam.sol).
3. Also you can clone this repo locally and run it by
			
			1. npm install
			2. npm build
			3. npm start


# Cezerin - Ecommerce Progressive Web Apps

[![CircleCI](https://circleci.com/gh/cezerin/cezerin/tree/master.svg?style=svg)](https://circleci.com/gh/cezerin/cezerin/tree/master)

Cezerin is React and Node.js based eCommerce platform. Allows creating a Progressive Web Apps.

Built with:
* Node.js v8.9
* React v16
* Redux
* Express
* Babel
* WebPack 4
* MongoDB

## Dashboard
Client-side dashboard use JSON Web Token (JWT) to access REST API.

![Cezerin Dashboard](https://cezerin.com/assets/images/cezerin-dashboard-products.png?)

![Signin email](https://cezerin.com/assets/images/cezerin-signin-email.png)

## Store
Single-Page Application with React server-side rendering. [Demo store](https://store.cezerin.com)

[![Cezerin Store](https://cezerin.com/assets/images/cezerin-mobile-product.png)](https://store.cezerin.com)

[![Cezerin Store](https://cezerin.com/assets/images/cezerin-mobile-order-summary.png)](https://store.cezerin.com)

## Installation

- [with GitHub](https://github.com/cezerin/cezerin/blob/master/docs/getting-started.md)
- [with Docker](https://github.com/cezerin/cezerin/blob/master/docs/getting-started-docker.md)
- [How to deploy a Cezerin on Ubuntu 16.04](https://github.com/cezerin/cezerin/blob/master/docs/how-to-deploy-a-cezerin-on-ubuntu-16-04.md)
- [How to deploy a Cezerin on Ubuntu 18.04.1 (from GitHub)](https://github.com/cezerin/cezerin/blob/master/docs/how-to-deploy-a-cezerin-on-ubuntu-18-04-1-github.md)

### Requirements
* Node.js >= 8
* MongoDB >= 3.2


## Documentation

[Documentation](https://github.com/cezerin/cezerin/tree/master/docs)


## Application Structure

```
.
├── config                   # Project and build configurations
├── dist                     # Distribution folder
├── locales                  # Text files
├── logs                     # Log files
├── public                   # Static public assets and uploads
│   ├── admin                # Dashboard index.html
│   ├── admin-assets         # Dashboard assets
│   └── content              # Store root folder
|
├── scripts                  # Shell scripts for theme install/export
├── src                      # Application source code
│   ├── admin                # Dashboard application
│   │   └── client           # Client side code
│   ├── api                  # REST API
│   │   └── server           # Server side code
│   ├── store                # Store application
│   |   ├── client             # Client side code
│   |   ├── server             # Server side code
│   |   └── shared             # Universal code
│   └── index.js             # Server application start point
├── theme                    # Theme as a local package
└── process.json             # pm2 process file
```


## Sponsoring

Cezerin is an MIT-licensed open source project. It's an independent project with ongoing development made possible thanks to the support of these awesome backers. [Become a backer or sponsor on OpenCollective](https://opencollective.com/cezerin).

### Sponsors

[Become a sponsor](https://opencollective.com/cezerin#sponsor) and get your logo on our README on Github and [cezerin.com](https://cezerin.com) with a link to your site.

<a href="https://opencollective.com/cezerin/tiers/sponsor/1/website" rel="noopener" target="_blank" style="margin-right: 8px;">
<img src="https://opencollective.com/cezerin/tiers/sponsor/1/avatar.svg" alt="0" /></a>
<a href="https://opencollective.com/cezerin/tiers/sponsor/2/website" rel="noopener" target="_blank" style="margin-right: 8px;">
<img src="https://opencollective.com/cezerin/tiers/sponsor/2/avatar.svg" alt="0" /></a>
<a href="https://opencollective.com/cezerin/tiers/sponsor/0/website" rel="noopener" target="_blank" style="margin-right: 8px;">
<img src="https://opencollective.com/cezerin/tiers/sponsor/0/avatar.svg" alt="0" /></a>


## Contributing

If you can, please contribute by reporting issues, discussing ideas, or submitting pull requests with patches and new features. We do our best to respond to all issues and pull requests within a day or two, and make patch releases to npm regularly.


## Licence

This software is provided free of charge and without restriction under the MIT License

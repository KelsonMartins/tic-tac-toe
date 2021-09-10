# \<tic-tac-toe>

A simple yet fun, classic tic-tac-toe webcomponent, built with lit-element and typescript. It can be packed and deployed in any web application, just like in the `demo/index.html`.

> This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## TODO

- [ ] Fix remaining ts errors;
- [ ] Refactor `referee.ts` helper;
- [ ] Add Cypress and Setup tests: [setup test with Cypress](https://www.thisdot.co/blog/testing-web-components-with-cypress-and-typescript)
- https://lit.dev/docs/

## Installation

```bash
npm i tic-tac-toe
```

## Usage

```html
<script type="module">
  import '../dist/src/index.js';
</script>

<tic-tac-toe></tic-tac-toe>
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`

<div align="center">
	<h1>
		@vyke/solid-destructurable
	</h1>
</div>
Helper to destructure reactive objects - like props or stores - or signals of them into a separate accessors updated individually.

## Installation
```sh
npm i @vyke/solid-destructurable
```

## API
### destructurable
Returns a destructurable object

```tsx
import { createStore } from 'solid-js'
import { destructurable } from '@vyke/solid-destructurable'

type StoreState = {
	theme?: 'light' | 'dark'
}

type AppProps = {
	title: string
}

function App(props: AppProps) {
	const { title } = destructurable(props)
	const store = createStore<StoreState>({ theme: 'light' })
	const { theme } = destructurable(store, { theme: 'dark'})

	return (
		<div>
			{title()}
			{theme()}
		</div>
	)
}
```

## Others vyke projects
- [Flowmodoro app by vyke](https://github.com/albizures/vyke-flowmodoro)
- [@vyke/tsdocs](https://github.com/albizures/vyke-tsdocs)
- [@vyke/val](https://github.com/albizures/vyke-val)
- [@vyke/dom](https://github.com/albizures/vyke-dom)

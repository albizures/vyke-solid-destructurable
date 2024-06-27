type DestructurableValue<
	TProps extends Record<string | symbol, any>,
	TDefaultProps extends Record<string | symbol, any>,
	TKey extends keyof TProps,
> = TKey extends keyof TDefaultProps ? NonNullable<TProps[TKey]> : TProps[TKey]

type DestructurableProps<
	TProps extends Record<string | symbol, any>,
	TDefaultProps extends Record<string | symbol, any>,
> = {
	[K in keyof TProps]-?: DestructurableValue<TProps, TDefaultProps, K> extends Function
	// if the value is a function, return the function
		? DestructurableValue<TProps, TDefaultProps, K>
		// if the function or a nullish value
		: NonNullable<DestructurableValue<TProps, TDefaultProps, K>> extends Function
			? DestructurableValue<TProps, TDefaultProps, K> | null
			: (
					args?: never
				// will remove null and undefined from the type when
				// a default value is provided
				) => DestructurableValue<TProps, TDefaultProps, K>;
}

type DefaultProps<TProps extends Record<string | symbol, any>> = {
	[K in keyof TProps]?: TProps[K];
}

/**
 * Returns a destructurable object
 * @example
 * ```tsx
 * import { createStore } from 'solid-js'
 * import { destructurable } from '@vyke/solid-destructurable'
 *
 * type StoreState = {
 * 	theme?: 'light' | 'dark'
 * }
 *
 * type AppProps = {
 * 	title: string
 * }
 *
 * function App(props: AppProps) {
 * 	const { title } = destructurable(props)
 * 	const store = createStore<StoreState>({ theme: 'light' })
 * 	const { theme } = destructurable(store, { theme: 'dark' })
 *
 * 	return (
 * 		<div>
 * 			{title()}
 * 			{theme()}
 * 		</div>
 * 	)
 * }
 * ```
 */
export function destructurable<
	TProps extends Record<string | symbol, any>,
	TDefaultProps extends DefaultProps<TProps> = NonNullable<unknown>,
>(
	props: TProps,
	defaultProps?: TDefaultProps,
): DestructurableProps<TProps, TDefaultProps> {
	return new Proxy(props, {
		get(target, prop, _receiver) {
			return (...args: Array<any>) => {
				const value = target[prop] ?? defaultProps?.[prop]
				if (typeof value === 'function') {
					return value(...args)
				}
				return value
			}
		},
	}) as unknown as DestructurableProps<TProps, TDefaultProps>
}

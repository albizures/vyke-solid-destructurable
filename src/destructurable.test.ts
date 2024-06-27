import { assertType, describe, expect, it } from 'vitest'
import { destructurable } from '.'

it('should return a destructurable object', () => {
	const props = { a: 1, b: 2 }
	const { a, b } = destructurable(props)

	expect(a()).toBe(1)
	expect(b()).toBe(2)
})

describe('when given a default prop', () => {
	it('should return a destructurable object with default props', () => {
	type Props = {
		foo: string
		bar?: number
	}

	const props: Props = {
		foo: 'foo',
	}

	const { foo, bar } = destructurable(props, { bar: 0 })

	assertType<number>(bar())

	expect(foo()).toBe('foo')
	expect(bar()).toBe(0)
	})
})

describe('when given a function', () => {
	it('should return a destructurable object with the function', () => {
		type Props = {
			foo: (name: string) => string
			bar?: (name: string) => string
		}
		const props: Props = { foo: (name: string) => `foo ${name}` }
		const { foo, bar } = destructurable(props)

		assertType<NonNullable<Props['bar']> | null>(bar)

		expect(foo('test')).toBe('foo test')
		// since bar is not defined, it should return undefined
		expect(bar && bar('test')).toBe(undefined)
	})

	describe('when given a default prop', () => {
		it('should return a destructurable object with the function', () => {
			type Props = {
				foo?: (name: string) => string
			}
			const props: Props = { foo: (name: string) => `foo ${name}` }
			const { foo } = destructurable(props, { foo: () => 'default' })

			expect(foo('test')).toBe('foo test')
		})
	})
})

import { isFunction, isArray, isUndefined } from './is'

export function eachTree(tree, handler, option) {
  if (option && isFunction(option.enter)) {
    option.enter(tree)
  }

  handler(tree)

  const { children } = tree
  if (isArray(children)) {
    children.forEach((child) => eachTree(child, handler, option))
  }

  if (option && isFunction(option.leave)) {
    option.leave(tree)
  }
}

export function someTree(tree, handler, option) {
  if (option && isFunction(option.enter)) {
    option.enter(tree)
  }

  let isMatch = handler(tree)
  const { children } = tree
  if (!isMatch && isArray(children)) {
    isMatch = children.some((child) => someTree(child, handler, option))
  }

  if (option && isFunction(option.leave)) {
    option.leave(tree)
  }

  return isMatch
}

export function findTree(tree, handler, option) {
  if (option && isFunction(option.enter)) {
    option.enter(tree)
  }

  let matchTree
  const isMatch = handler(tree)
  if (isMatch) {
    matchTree = tree
  }

  const { children } = tree
  if (!matchTree && isArray(children)) {
    children.some((child) => {
      matchTree = findTree(child, handler, option)
      return !isUndefined(matchTree)
    })
  }

  if (option && isFunction(option.leave)) {
    option.leave(tree)
  }

  return matchTree
}

export function mapTree(tree, handler, option) {
  if (option && isFunction(option.enter)) {
    option.enter(tree)
  }

  const data = handler(tree)
  if (isArray(tree.children)) {
    const newChildren = tree.children.map((child) => mapTree(child, handler, option))
    data.children = newChildren
  }

  if (option && isFunction(option.leave)) {
    option.leave(tree)
  }

  return data
}

export function reduceTree(tree, handler, initialValue, option) {
  if (option && isFunction(option.enter)) {
    option.enter(tree)
  }

  let nextValue = handler(initialValue, tree)
  if (isArray(tree.children)) {
    nextValue = tree.children.reduce((result, child) => {
      return reduceTree(child, handler, nextValue, option)
    }, nextValue)
  }

  if (option && isFunction(option.leave)) {
    option.leave(tree)
  }

  return nextValue
}

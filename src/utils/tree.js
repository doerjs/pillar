import { isFunction, isArray } from './is'

export function eachTree(tree, handler, option) {
  if (option && isFunction(option.enter)) {
    option.enter(tree)
  }

  handler(tree)

  const { children } = tree
  if (children) {
    children.forEach((child) => eachTree(child, handler, option))
  }

  if (option && isFunction(option.leave)) {
    option.leave(tree)
  }
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
  if (!matchTree && children) {
    matchTree = children.find((child) => findTree(child, handler, option))
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

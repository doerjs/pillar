import { isFunction } from './is'

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

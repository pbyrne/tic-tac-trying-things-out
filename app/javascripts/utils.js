const groupBy = (arr, condition) => {
  return arr.reduce((obj, item) => {
    const key = condition(item)

    obj[key] = obj[key] || []
    obj[key].push(item)

    return obj
  }, new Object())
}

module.exports = {
  groupBy
}

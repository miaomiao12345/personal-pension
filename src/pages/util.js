const transX = 110
const transY = 100
const startX = 100
const startY = 100

function getGraphDataByYear(year, storeNum, rate) {
  const nodes = []
  let allPrincipal = 0
  let allInterest = 0
  const y = startY + transY*(year-1)
  const x = startX + transX*(year+1)
  while (year > 0) {
    const principal = Math.round(storeNum * Math.pow(1+rate/100, year-1), 2)
    allPrincipal += principal
    const interest = Math.round(principal*rate/100, 2)
    allInterest += interest
    console.log({storeNum, rate, principal, interest})
    nodes.push({
      type: 'rect',
      x: x - (year-1)*transX,
      y,
      text: `本金：${principal}\n利息：${interest}`
    })
    year--
  }
  nodes.push({
    type: 'rect',
    x: startX + transX,
    y,
    text: `累计\n本金：${allPrincipal}\n利息：${allInterest}`
  })
  return {nodes, allPrincipal, allInterest}
}
export function getGraphData ({years, rate, taxRate}) {
  console.log(years, rate, taxRate)
  const storeNum =12000 - 12000*(taxRate - 3)/100
  const textNodes = []
  const nodes = []
  let allPrincipal = 0
  let allInterest = 0
  // const edges = []
  for (let i = 1;i < years+1; i++) {
    textNodes.push({
      type: 'text',
      x: startX,
      y: startY + transY*(i-1),
      text: `第${i}年`
    })
    const {nodes:yearNodes,allPrincipal:yearPrincipal,allInterest:yearInterest} = getGraphDataByYear(i, storeNum, rate)
    allPrincipal = yearPrincipal
    allInterest = yearInterest
    nodes.push(...yearNodes)
  }
  textNodes.push({
    type: 'text',
    x: startX,
    y: startY + transY*(years),
    text: `合计（存银行或自己理财）`
  })
  const finalPrincipal = storeNum * years
  const finalInterest = allPrincipal + allInterest - finalPrincipal
  nodes.push({
    type: 'rect',
    x: startX + transX,
    y: startY + transY*(years),
    text: `投入本金：${finalPrincipal}\n获得利息：${finalInterest}\n账户余额${finalPrincipal + finalInterest}`
  })
  textNodes.push({
    type: 'text',
    x: startX,
    y: startY + transY*(years +1),
    text: `若坚持投资养老金账户`
  })
  nodes.push({
    type: 'rect',
    x: startX + transX,
    y: startY + transY*(years + 1),
    text: `账户余额：${12000 * years}\n获得利息：？`
  })
  return {nodes: [
    ...textNodes,
    ...nodes,
  ]}
}

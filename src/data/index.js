import faker from 'faker'
export const systemTypes = {
  file: 'file',
  dir: 'dir',
}
const getName = (type) => {
  if (type === systemTypes.file) return faker.system.commonFileName()
  if (type === systemTypes.dir) return faker.database.column()
  return ''
}

const types = [systemTypes.file, systemTypes.dir]
const getRandomData = ({ currentColumnIdx, maxColumnCount, maxRow }) => {
  const actualMaxRow = currentColumnIdx === 0 ? 10 : maxRow
  const count = Math.floor(Math.random() * actualMaxRow) + 1
  const isLastColmun = currentColumnIdx === maxColumnCount - 1
  const rows = [...Array(count)].map(() => {
    const type = isLastColmun
      ? systemTypes.file
      : types[Math.round(Math.random())]
    if (type === systemTypes.dir) {
      const children = getRandomData({
        currentColumnIdx: currentColumnIdx + 1,
        maxColumnCount,
        maxRow,
      })
      return {
        type,
        label: getName(type),
        children,
      }
    } else {
      return {
        type,
        label: getName(type),
      }
    }
  })
  return rows
}

export const getFakeData = () => {
  return getRandomData({
    currentColumnIdx: 0,
    maxColumnCount: 4,
    maxRow: 20,
  })
}

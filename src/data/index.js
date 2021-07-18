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

const fileType = systemTypes.file
const dirType = systemTypes.dir

const types = [systemTypes.file, systemTypes.dir]
const getRandomData = (columnCount, maxRow) => {
  const count = Math.floor(Math.random() * maxRow) + 1
  const rows = [...Array(count)].map(() => {
    const type =
      columnCount === 1 ? systemTypes.file : types[Math.round(Math.random())]
    if (type === systemTypes.dir) {
      const children = getRandomData(columnCount - 1, maxRow)
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

export const fakeData = getRandomData(4, 10)


export const systemTypes = {
  file: 'file',
  dir: 'dir'
}

export const fakeData = [
  {
    label: 'a',
    type: systemTypes.file
  },
  {
    label: 'b',
    type: systemTypes.file
  },
  {
    label: 'c',
    type: systemTypes.dir,
    children: [
      {
        label: 'c1',
        type: systemTypes.file
      },
      {
        label: 'c2',
        type: systemTypes.dir,
        children: [
          {
            label: 'c21',
            type: systemTypes.file
          },
          {
            label: 'c22',
            type: systemTypes.file
          },
        ]
      },
    ]
  }
]

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  deletePage(page)
  createPage({
    ...page,
    context: {
      maxPrice: 100000,
      category: `//gi`,
      limit: 16,
    },
  })
}

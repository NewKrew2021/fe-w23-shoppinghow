const createTagListTemplate = tagList => {
  const tagReducer = (acc, tag) =>
    acc + `<div class="product-tag">${tag}</div>`;
  return tagList.reduce(tagReducer);
};

const createProductListTemplate = productItemList => {
  const productListContent = productItemList.reduce(
    (acc, { image, title, description, tagList }) =>
      acc +
      `<li class="product-item">
          <img
            class="product-item__image"
            src="${image}"
          />
          <div class="product-item__title">${title}</div>
          <div class="product-item__description">
            ${description}
          </div>
          <div class="product-tag-list">
            <div class="product-tag">
            ${createTagListTemplate(tagList)}
            </div>
          </div>
        </li>`,
    ''
  );

  return `<ul class="product-list__row">${productListContent}</ul>`;
};

export { createProductListTemplate };

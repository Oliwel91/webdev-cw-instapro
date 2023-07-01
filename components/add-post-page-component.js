import { renderUploadImageComponent } from "./upload-image-component.js";
import { renderHeaderComponent } from "./header-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `<div class="page-container">
      <div class="header-container">
        <div class="form">
          <h3 class="form-title">Добавить пост</h3>
            <div class="form-inputs">
              <div class="upload-image-container">
                <div class="upload=image">
                  <label class="file-upload-label secondary-button">
                    <input type="file" class="file-upload-input" style="display:none">Выберите фото
                  </label>
                </div>
              </div>  
            </div>
          <label>Опишите фотографию:
          <textarea class="input textarea" id="description-input" rows="2"></textarea>
          </label>
          <button class="button" id="add-button">Добавить</button>
        </div>
      </div>
    </div>`;

    appEl.innerHTML = appHtml;
// Создаем константу, которая получает ссылку на элемент с классом upload-image-container внутри элемента с id="app" (appEl)
    const uploadImageContainer = appEl.querySelector(".upload-image-container");
// Создаем константу, которая получает ссылку на элемент с id="description-input"
    const descriptionEl = document.getElementById("description-input");
    
// Здесь будет храниться ссылка на загруженное изображение
    let imageUrl;
//Если в appEl найден элемент с классом upload-image-container, то вызываем функцию, которая принимает объект с обоими свойствами
    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"), // Этот элемент будет рендерить компонент загрузки изображения
        onImageUrlChange(newImageUrl) { // функция, которая будет вызываться при изменении ссылки на загруженное изображение
          imageUrl = newImageUrl;
        },
      });
    }
// При клике на кнопку вызывается обработчик, который вызывает функцию onAddPostClick и передает ей объект с двумя свойствами
    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: descriptionEl.value
//Закрытие уязвимостей
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
        imageUrl: imageUrl,
      });
    });
  };

  render();
} 
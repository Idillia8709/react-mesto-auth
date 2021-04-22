export default function renderLoading(isLoading, buttonElement, titleButton) {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...'
  } else
  buttonElement.textContent = titleButton;
}

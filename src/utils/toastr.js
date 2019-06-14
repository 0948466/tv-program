import toastr from 'toastr';

toastr.options.closeDuration = 10000;

export function showError(msg) {
  toastr.remove();
  toastr.options = {
    positionClass: 'toast-top-right',
    closeButton: true,
  };
  toastr.error(msg);
}

export function showSuccess(msg, title = '') {
  toastr.remove();
  toastr.options = {
    positionClass: 'toast-top-right',
    closeButton: true,
  };
  toastr.success(title, msg);
}

export function showRecaptchaError() {
  toastr.remove();
  toastr.options = {
    positionClass: 'toast-top-right',
    closeButton: true,
  };
  toastr.error('Необходимо выполнить проверку reCAPTCHA');
}

export function showPasswordMatchError() {
  toastr.remove();
  toastr.options = {
    positionClass: 'toast-top-right',
    closeButton: true,
  };
  toastr.error('Пароли не совпадают');
}

export function showNetworkError() {
  toastr.remove();
  toastr.options = {
    positionClass: 'toast-top-right',
    closeButton: true,
  };
  toastr.error('Проблемы на сервере. Пожалуйста, попробуйте позже.');
}

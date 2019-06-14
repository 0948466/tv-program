import Terms from '../assets/pdf/пользовательское_соглашение.pdf';

export default {
  channels: '/api/v1/channels',
  sing_in: '/api/v1/users/sign_in',
  sign_out: '/api/v1/users/sign_out',
  sing_up: '/api/v1/users/sign_up',
  restore: '/api/v1/users/password/',
  change_password: '/api/v1/users',
  change_user_attributes: '/api/v1/users/',
  schedules: '/api/v1/schedules/schedules_request',
  terms: Terms,
};

export const userMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

export const userLoginMock = {
  "email": "admin@admin.com",
  "password": "secret_admin"
};

export const userLoginNotEmailMock = {
  "password": "secret_admin"
};

export const userLoginEmailInvalidMock = {
  "email": "admin@admin.co",
  "password": "secret_admin"
};

export const userLoginNotPassMock = {
  "email": "admin@admin.com"
};

export const userLoginPassInvalidMock = {
  "email": "admin@admin.com",
  "password": "secret_admi"
};

export const userTokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTY2NDQ4MDExMX0.FTYA6cW2f31V10_UDwjCjgibS1O3_ho8_fsJfxCpa7I';

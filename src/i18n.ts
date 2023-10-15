import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
  lng: "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false
  },
  resources: {
    ru: {
      translation: {
        switch_language: "Сменить язык",
        moderator: "Модератор",
        profile: "Профиль",
        logout: "Выйти",
        login: "Войти",
        register: "Зарегистрироваться",
        your_comment: "Ваш комментарий",
        comment_area_placeholder: "Напишите комментарий...",
        comment_area_button: "Отправить комментарий",
        published_at: "Опубликовано: ",
        not_published: "Не опубликовано",
        delete: "Удалить",
        publish: "Опубликовать",
        no_comments: "Нет комментариев!",
        username: "Логин",
        password: "Пароль",
        previous: "Назад",
        next: "Вперед",
        author: "Автор: ",
        created_at: "Создано: ",
        updated_at: "Обновлено: ",
        read: "Читать",
        update: "Обновить",
        no_posts: "Нет постов!",
        title: "Заголовок",
        title_placeholder: "Новый пост",
        content: "Содержимое",
        content_placeholder: "Напишите здесь свои мысли...",
        hello: "Привет",
        profile_name: "Имя и фамилия",
        role: "Роль",
        first_name: "Имя",
        last_name: "Фамилия",
        first_name_placeholder: "Иван",
        last_name_placeholder: "Иванов",
        create: "Создать",
        create_post: "Создать пост",
        login_error: "Логин и/или пароль неверны",
        unpublished_posts: "Неопубликованные посты",
        unpublished_comments: "Неопубликованные комментарии",
        my_posts: "Мои посты",
        my_comments: "Мои комментарии",
        comments: "Комментарии",
        update_post: "Обновить пост",
        home: "Домашняя страница"
      }
    },
    en: {
      translation: {
        switch_language: "Switch language",
        moderator: "Moderator",
        profile: "Profile",
        logout: "Logout",
        login: "Login",
        register: "Register",
        your_comment: "Your comment",
        comment_area_placeholder: "Write a comment...",
        comment_area_button: "Post comment",
        published_at: "Published at: ",
        not_published: "Not published",
        delete: "Delete",
        publish: "Publish",
        no_comments: "No comments!",
        username: "Username",
        password: "Password",
        previous: "Previous",
        next: "Next",
        author: "Author: ",
        created_at: "Created at: ",
        updated_at: "Updated at: ",
        read: "Read",
        update: "Update",
        no_posts: "No posts!",
        title: "Title",
        title_placeholder: "New post",
        content: "Content",
        content_placeholder: "Write your thoughts here...",
        hello: "Hello",
        profile_name: "Name",
        role: "Role",
        first_name: "First name",
        last_name: "Last name",
        first_name_placeholder: "John",
        last_name_placeholder: "Doe",
        create: "Create",
        create_post: "Create post",
        login_error: "Login and/or password are incorrect",
        unpublished_posts: "Unpublished posts",
        unpublished_comments: "Unpublished comments",
        my_posts: "My posts",
        my_comments: "My comments",
        comments: "Comments",
        update_post: "Update post",
        home: "Home"
      }
    }
  }
});

export default i18n;
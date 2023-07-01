// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
const personalKey = "Vitya";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export async function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }
      return response.json();
    })
    .then((data) => {
// Получаем сразу все свойства поста
      return data.posts.map((post) => {
        return {
          name: post.user?.name,
          description: post.description,
          time: post.createdAt,
          postImg: post.imageUrl,
          userImg: post.user?.imageUrl,
          id: post.user.id,
          idPost: post.id,
          isLiked: post.isLiked,
          likes: post.likes.length,
          whoseLike: post.likes[0]?.name,
        };
      });
    });
}

export async function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export async function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export async function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
}

// Отправляем POST-запрос на сервер для добавления нового поста

export async function addPost({ token, description, imageUrl }) {
  return fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      description,
      imageUrl,
    }),
  }).then((response) => {
    if(response.status === 400) {
      throw new Error ('Картинку нужно описать и прикрепить')
    }
    return response.json();
  })
};

// Получаем список постов пользователя с заданным идентификатором

export async function getUserPosts(userId, token) {
  return fetch(postsHost + "/user-posts/" + userId, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts.map((post) => {
        return {
          name: post?.user?.name,
          description: post.description,
          time: post.createdAt,
          postImg: post.imageUrl,
          userImg: post?.user?.imageUrl,
          id: post.user?.id,
          idPost: post.idPost,
          isLiked: post.isLiked,
          likes: post.likes.length,
          whoseLike: post?.likes[0]?.name,
        }
      });
    });
  };

  // Отправляем POST-запрос на сервер для поста, которому нужно добавить лайк
  export function addLike({ token, idPost }) {
    return fetch(postsHost + "/" + idPost + "/like", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        idPost,
      }),
    })
  };
// Отправляем POST-запрос на сервер для поста, которому нужно добавить дизлайк
  export function addDislike({ token, idPost }) {
    return fetch(postsHost + "/" + idPost + "/dislike", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        idPost,
      }),
     })
  }
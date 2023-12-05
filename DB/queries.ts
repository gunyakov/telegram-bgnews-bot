export default {
  GET_ALL_USERS: "SELECT * FROM usersList;",

  GET_ONE_USER: "SELECT * FROM usersList WHERE chatID = ?;",

  GET_ONE_USER_BY_ID: "SELECT * FROM usersList WHERE ID = ?;",

  REG_USER: "INSERT INTO usersList (chatID, name, lang) VALUES (?, ?, ?);",

  USER_SET_LANGUAGE: "UPDATE usersList SET lang = ? WHERE ID = ?;",

  DELETE_USER: "DELETE FROM usersList WHERE chatID = ?;",

  UPDATE_USER_LANG: "UPDATE usersList SET `lang` = ? WHERE ID = ?;",

  CHECK_NEWS: "SELECT * FROM news WHERE site = ? AND hash = ? LIMIT 1;",

  INSERT_NEWS:
    "INSERT INTO news (site, hash, title, image, video, news) VALUES (?, ?, ?, ?, ?, ?);",

  GET_NEWS: "SELECT * FROM news WHERE used = 'no' ORDER BY ID LIMIT 1;",

  SET_NEWS_USED: "UPDATE news SET used = 'yes' WHERE ID = ?;",
};

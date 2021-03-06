import jsonplaceholder from "../API/JSONplaceholder";
import _ from "lodash";

export const fetchPosts = () => {
  return async function (dispatch) {
    const response = await jsonplaceholder.get("/posts");
    dispatch({
      type: "FETCH_POSTS",
      payload: response.data,
    });
  };
};

export const fetchUserInfo = (id) => {
  return async function (dispatch, getState) {
    const response = await jsonplaceholder.get(`/users/${id}`);

    dispatch({
      type: "FETCH_USER",
      payload: response.data,
    });
  };
};

export const fetchPostsAndUsers = () => {
  return async function (dispatch, getState) {
    await dispatch(fetchPosts());
    const userIds = _.uniq(_.map(getState().posts, "userId"));
    userIds.forEach((id) => dispatch(fetchUserInfo));
  };
};

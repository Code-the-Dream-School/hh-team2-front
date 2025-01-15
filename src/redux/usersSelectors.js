import { createSelector } from "reselect";

const selectUsersList = (state) => state.users?.list || [];
const selectCurrentUser = (state) => state.auth?.user || null;

export const selectFilteredUsers = createSelector(
    [selectUsersList, selectCurrentUser],
    (users, currentUser) => {
        if (!currentUser) return users;
        return users.filter(
            (u) =>
                u.username !== currentUser.username &&
                `${u.first_name} ${u.last_name}` !== `${currentUser.first_name} ${currentUser.last_name}`
        );
    }
);

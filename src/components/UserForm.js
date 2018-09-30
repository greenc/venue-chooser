import React from 'react';

const UserForm = ({ users, selected, handleChange }) => {
    return (
        <form>
            <label>
                Attendees:
                <select value={selected} onChange={handleChange} multiple={true}>
                    {users.map(user =>
                        <option value={user} key={user}>{user}</option>
                    )}
                </select>
            </label>
        </form>
    );
}

export default UserForm;

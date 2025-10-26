import mongoose from "mongoose";

const getSearchQuery = (searchField, searchOrder, cursor) => {
    const compare = searchOrder==1 ? '$gt' : '$lt';
    const secondaryCompare = '$lt';
    const cursorId = new mongoose.Types.ObjectId(cursor._id)
    let cursorValue;

    if (searchField=="createdAt" || searchField=="updatedAt") cursorValue = new Date(cursor[searchField]);
    else if (searchField=="profileViews") cursorValue = parseInt(cursor[searchField]);
    else cursorValue = cursor[searchField];

    return {
        $or : [
            {[searchField]: {[compare]: cursorValue}},
            {[searchField]: cursorValue, _id: { [secondaryCompare]: cursorId }}
        ]
    }
}

const getSortQuery = (searchField, searchOrder) => {
    return {[searchField]:searchOrder, _id: -1};
}

export {
    getSearchQuery,
    getSortQuery,
}
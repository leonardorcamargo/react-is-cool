class Presence {
    constructor({
        _id,
        presence,
        entryTime,
        exitTime
    }) {
        this._id = _id;
        this.presence = presence;
        this.entryTime = new Date(entryTime);
        this.exitTime = new Date(exitTime);
    }
}

export default Presence;
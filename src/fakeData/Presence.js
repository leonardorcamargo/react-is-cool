class Presence {
    constructor({
        _id,
        presence,
        entryTime,
        exitTime
    }) {
        this._id = _id;
        this.presence = presence;
        this.entryTime = entryTime;
        this.exitTime = exitTime;
    }
}

module.exports = Presence;
class TomError {
    constructor(error: Error | TomError | string) {
        // If string or ...
    }

    set statusText(text: string) {
        this.statusText = text;
        // and add code
    }
}

export default TomError;

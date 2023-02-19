class CLevel {
    static DEBUG = 0
    static INFO = 1
    static WARN = 2
    static ERROR = 3
    static Levels = [
        this.DEBUG,
        this.INFO,
        this.WARN,
        this.ERROR
    ]
}

class MyConsole {
    #cLevel

    constructor (cLevel = 0) {
        this.setCLevel(cLevel)
    }

    setCLevel (cLevel) {
        if (!CLevel.Levels.includes(cLevel)) {
            throw new TypeError(`Invalid argument cLevel: ${cLevel}.`)
        }
        this.#cLevel = cLevel
    }

    getCLevel () {
        return this.#cLevel
    }

    debug (...msgs) {
        this.#cLevel <= CLevel.DEBUG &&
        console.debug(...msgs)
    }

    info (...msgs) {
        this.#cLevel <= CLevel.INFO &&
        console.info(...msgs)
    }
    
    warn (...msgs) {
        this.#cLevel <= CLevel.WARN &&
        console.warn(...msgs)
    }

    error (...msgs) {
        this.#cLevel <= CLevel.ERROR &&
        console.error(...msgs)
    }
}

export {
    CLevel,
    MyConsole
}
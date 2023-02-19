/**
 * 抽象部分与实现部分独立变化，
 * 但调用接口保持不变。
 * 如演奏者演奏乐器，
 * 演奏者有几个不同人，
 * 乐器是几种不同乐器，
 * 可以有多种排列组合。
 */

// 父类
class Player {
    constructor (sex, name) {
        this.sex = sex
        this.name = name
    }

    playInstrument (instrument) {
        instrument
        .setPlayer(this)
        .play()
    }
}

class instrument {
    constructor (type, name) {
        this.type = type
        this.name = name
        this.player = {}
    }

    setPlayer (player) {
        this.player = player
        return this
    }

    play () {
        console.log(`The ${this.player.sex ?? 'unknown'} ${this.player.name ?? 'human'} is playing the ${this.type} ${this.name}`)
    }
}

// 子类
class Boy extends Player {
    constructor (name) {
        super('boy', name)
    }

    playInstrument (instrument) {
        super.playInstrument(instrument)
        console.log(`Poor ${this.name}!`)
    }
}

class Girl extends Player {
    constructor (name) {
        super('girl', name)
    }

    playInstrument (instrument) {
        super.playInstrument(instrument)
        console.log(`Love you ${this.name}!`)
    }
}

// 实现Instrument
class Piano extends instrument {
    constructor (name) {
        super('piano', name)
    }

    play () {
        super.play()
        console.log('Wonderful noise?')
    }
}

class Violin extends instrument {
    constructor (name) {
        super('violin', name)
    }

    play () {
        super.play()
        console.log('Bravo music!')
    }
}

// HTML解析完成后执行
document.addEventListener('DOMContentLoaded', () => {
    let theBoy = new Boy('Peter')
    let theGirl = new Girl('Amy')
    let pianoModel = new Piano('YS2')
    let violinModel = new Violin('STV-900')

    theBoy.playInstrument(pianoModel)
    theGirl.playInstrument(violinModel)
})
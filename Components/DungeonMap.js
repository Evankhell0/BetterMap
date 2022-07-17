import MapPlayer from "./MapPlayer"
import Room from "./Room"

const BufferedImage = Java.type("java.awt.image.BufferedImage")

let mapDataScale = {
    "E": 22,
    "1": 22,
    "2": 22,
    "3": 22,
    "4": 20,
    "5": 20,
    "6": 20,
    "7": 20
}


class DungeonMap {
    constructor(floor) {
        /**
         * @type {Map<String, Room>} The string is in form x,y eg 102,134 and will correspond to the top left corner of a room component
         */
        this.rooms = new Map()

        this.roomScaleMap = mapDataScale[floor[floor.length - 1]] //how many pixels on the map is 32 blocks

        /**
         * @type {Set<Room>} So that its easy to loop over all rooms without duplicates
         */
        this.roomsArr = new Set()

        this.floor = floor

        this.lastChanged = Date.now()

        /**
         * @type {Array<MapPlayer>}
         */
        this.players = []

        this.currentRenderContextId = 0

        this.lastRenderContext = 0
        this.renderContexts = []
    }

    markChanged() {
        this.lastChanged = Date.now()
    }

    createRenderContext({ x, y, size, headScale = 8 }) {
        let contextId = this.lastRenderContext++

        let contextData = {
            x,
            y,
            size,
            headScale,
            image,
            imageLastUpdate,
            lastImage
        }

        this.renderContexts[contextId] = contextData

        return contextId
    }

    getRenderContextData(contextId) {
        return this.renderContexts[contextId]
    }

    getCurrentRenderContext() {
        return this.getRenderContextData(this.currentRenderContextId)
    }

    draw(contextId) {
        this.currentRenderContextId = contextId

        //TODO: create image if not cached or cache outdated
        //TODO: render map background
        //TODO: render image
        //TODO: render stuff overlayed on the image (heads, text on map, secrets info ect)
    }

    updateFromMap(mapData) {

    }

    renderImage(contextId) {
        //create 256x256 image
        let image = new BufferedImage(256, 256, BufferedImage.TYPE_INT_ARGB)

        //create graphics rendering context
        let graphics = image.createGraphics()

        //translate dungeon into view
        graphics.translate(256 - 32, 256 - 32)

        //TODO: render doors

        //render rooms
        for (let room of this.roomsArr) {
            room.render(graphics)
        }

        //undo translation
        graphics.translate(-256 + 32, -256 + 32)

        return image
    }
}

export default DungeonMap
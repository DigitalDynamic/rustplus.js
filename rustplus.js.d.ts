/*
Conversion stuff:
optional (.*?) (.*?) = (.*?);
(.*?): (.*?)
*/

export default class RustPlus extends EventEmitter {
    server: string
    port: number
    playerId: string
    playerToken: string
    useFacepunchProxy: boolean
    seq: number
    seqCallbacks: ((message: string) => void)[]

    constructor(server: string, port: number, playerId: string, playerToken: string, useFacepunchProxy: boolean)
    on(event: "connecting", listener: () => void): this
    on(event: "connected", listener: () => void): this
    on(event: "message", listener: (message: AppMessage) => void): this
    on(event: "request", listener: (request: AppRequest) => void): this
    on(event: "disconnected", listener: () => void): this
    on(event: "error", listener: (error: Error) => void): this

    connect: () => void
    disconnect: () => void
    sendRequest: (data: AppRequest, callback?: RequestCallback) => void
    sendRequestAsync: (data: AppRequest, timeoutMilliseconds?: number) => Promise<AppResponse>
    setEntityValue: (entityId: EntityId, value: boolean, callback: RequestCallback) => void
    turnSmartSwitchOn: (entityId: EntityId, callback: RequestCallback) => void
    turnSmartSwitchOff: (entityId: EntityId, callback: RequestCallback) => void
    strobe: (entityId: EntityId, timeoutMilliseconds?: number, value?: boolean) => void
    sendTeamMessage: (message: string, callback: RequestCallback) => void
    getEntityInfo: (entityId: EntityId, callback: RequestCallback) => void
    getMap: (callback: RequestCallback) => void
    getTime: (callback: RequestCallback) => void
    getMapMarkers: (callback: RequestCallback) => void
    getInfo: (callback: RequestCallback) => void
    getTeamInfo: (callback: RequestCallback) => void
    getCameraFrame: (identifier: string, frame: number, callback: RequestCallback) => void
}

type RequestCallback = (message: AppMessage) => void
type EntityId = number

interface AppMessage {
    response?: AppResponse
    broadcast?: AppBroadcast
}

interface AppBroadcast {
    teamChanged?: AppTeamChanged
    teamMessage?: AppTeamMessage
    entityChanged?: AppEntityChanged
}

interface AppRequest {
    seq: number
    playerId: string
    playerToken: number

    entityId?: EntityId
    getInfo?: any
    getTime?: any
    getTime?: any
    getMap?: any
    getTeamInfo?: any
    getTeamChat?: any
    sendTeamMessage?: AppSendMessage
    getEntityInfo?: any
    setEntityValue?: AppSetEntityValue
    checkSubscription?: any
    setSubscription?: AppFlag
    getMapMarkers?: any
    getCameraFrame?: AppCameraFrameRequest
    promoteToLeader?: AppPromoteToLeader
}

interface AppResponse {
    seq: number
    success?: any
    error?: AppError
    info?: AppInfo
    map?: AppMap
    teamInfo?: AppTeamInfo
    teamChat?: AppTeamChat

}

interface AppSendMessage {
    message: string
}

interface AppSetEntityValue {
    value: boolean
}

interface AppFlag {
    value: boolean
}

interface AppCameraFrameRequest {
    identifier: string
    frame: number
}

interface AppPromoteToLeader {
    steamId: number
}

interface AppError {
    error: string
}

interface AppInfo {
    name: string
    headerImage: string
    url: string
    map: string
    mapSize: number
    wipeTime: number
    players: number
    maxPlayers: number
    queuedPlayers: number
    seed?: number
    salt?: number
}

interface AppTime {
    dayLengthMinutes: number
    timeScale: number
    sunrise: number
    sunset: number
    time: number
}

interface AppMap {
    width: number
    height: number
    jpgImage: any[]
    oceanMargin: number
    monuments: AppMapMonument[]
    background: string
}

interface AppMapMonument {
    token: string
    x: number
    y: number
}

interface AppCameraFrame {
    frame: number
    jpgImage: any[]
}

enum AppMarkerType {
    Player = 1,
    Explosion = 2,
    VendingMachine = 3,
    CH47 = 4,
    CargoShip = 5,
    Crate = 6,
    GenericRadius = 7,
    PatrolHelicopter = 8
}

interface AppTeamChanged {
    playerId: number
    teamInfo: AppTeamInfo
}

interface AppTeamMessage {
    message: AppChatMessage
}

interface AppEntityChanged {
    entityId: EntityId
    payload: AppEntityPayload
}

interface AppMarker {

    id: number
    type: AppMarkerType
    x: number
    y: number
    steamId?: number
    rotation?: number
    radius?: number
    color1?: Vector4
    color2?: Vector4
    alpha?: number
    name?: string
    sellOrders?: SellOrder[]

}

interface SellOrder {
    itemId: number
    quantity: number
    currencyId: number
    costPerItem: number
    amountInStock: number
    itemIsBlueprint: boolean
    currencyIsBlueprint: boolean
}

interface Vector4 {
    x?: float
    y?: float
    z?: float
    w?: float
}

interface AppEntityPayload {
	value?: boolean
	items?: AppEntityPayloadItem[]
	capacity?: number
	hasProtection?: boolean
	protectionExpiry?: number

}

interface AppEntityPayloadItem {
    itemId: number
    quantity: number
    itemIsBlueprint: boolean
}

enum AppEntityType {
	Switch = 1,
	Alarm = 2,
	StorageMonitor = 3
}

interface AppEntityInfo {
	type: AppEntityType
	payload: AppEntityPayload
}

interface AppChatMessage {
	steamId: number
	name: string
	message: string
	color: string
	time: number
}

interface AppTeamChat {
	messages: AppChatMessage[]
}

interface AppTeamInfo {
	leaderSteamId: number
	members: AppTeamInfoMember[]
	mapNotes: AppTeamInfoNote[]
	leaderMapNotes: AppTeamInfoNote[]
}

interface AppTeamInfoMember {
    steamId: uint64
    name: string
    x: float
    y: float
    isOnline: bool
    spawnTime: uint32
    isAlive: bool
    deathTime: uint32
}

interface AppTeamInfoNote {
    type: int32
    x: float
    y: float
}
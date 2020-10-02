import olSourceVector from 'ol/source/Vector';
import { FeatureDataSource } from './feature-datasource';
import { WebSocketDataSourceOptions } from './websocket-datasource.interface';
export declare class WebSocketDataSource extends FeatureDataSource {
    ws: WebSocket;
    options: WebSocketDataSourceOptions;
    protected createOlSource(): olSourceVector;
    private createWebSocket;
    onMessage(event: any): void;
    onClose(event: any): void;
    onError(event: any): void;
    onOpen(event: any): void;
    onUnwatch(): void;
}

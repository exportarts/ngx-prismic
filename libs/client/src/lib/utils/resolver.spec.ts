import { makeStateKey, TransferState, StateKey } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { ResolverUtils } from './resolver';

describe('ResolverUtils', () => {

    describe('resolveWithTransferState()', () => {
        let transferStateMock: jest.Mock;
        let transferState: TransferState;
        let resolveObs: () => Observable<any>;
        let key1: StateKey<any>;
        let key2: StateKey<any>;

        let hasKeySpy: jest.SpyInstance;
        let getSpy: jest.SpyInstance;
        let setSpy: jest.SpyInstance;
        beforeEach(() => {
            transferStateMock = jest.fn((map: Map<StateKey<any>, any>) => ({
                hasKey: key => map.has(key),
                get: key => map.get(key),
                set: (key, value) => map.set(key, value)
            }));
            key1 = makeStateKey<any>('key');
            key2 = makeStateKey<any>('key2');
            transferState = transferStateMock(new Map<string, any>([[key1, 'value1']])) as unknown as TransferState;
            resolveObs = jest.fn(() => of('value')) as unknown as () => Observable<any>;

            hasKeySpy = jest.spyOn(transferState, 'hasKey');
            getSpy = jest.spyOn(transferState, 'get');
            setSpy = jest.spyOn(transferState, 'set');
        });

        it('should return a value from TransferState', async done => {
            const sub = ResolverUtils.resolveWithTransferState(
                transferState,
                key1,
                resolveObs()
            );

            sub.subscribe(v => {
                expect(v).toEqual('value1');
                expect(hasKeySpy).toHaveBeenCalledTimes(1);
                expect(getSpy).toHaveBeenCalledTimes(1);
                expect(setSpy).toHaveBeenCalledTimes(0);
                done();
            });
        });

        it('should use the Observable if no value is in TransferState', async done => {
            const sub = ResolverUtils.resolveWithTransferState(
                transferState,
                key2,
                resolveObs()
            );

            sub.subscribe(v => {
                expect(v).toEqual('value');
                expect(hasKeySpy).toHaveBeenCalledTimes(1);
                expect(getSpy).toHaveBeenCalledTimes(0);
                expect(setSpy).toHaveBeenCalledTimes(1);
                done();
            })
        });

        it('should ignore TransferState according to condition', async done => {
            const sub = ResolverUtils.resolveWithTransferState(
                transferState,
                key1,
                resolveObs(),
                false
            );

            sub.subscribe(v => {
                expect(v).toEqual('value');
                expect(hasKeySpy).toHaveBeenCalledTimes(1);
                expect(getSpy).toHaveBeenCalledTimes(0);
                expect(setSpy).toHaveBeenCalledTimes(1);
                done();
            })
        });
    });
    
});

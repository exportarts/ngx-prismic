import { StateKey, TransferState } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TypedApiSearchResponse, TypedDocument } from '../models/api.model';

export class ResolverUtils {

    /**
     * Use this function in resolvers to resolve some content from Prismic.
     * 
     * The resolved value will be set in the `TransferState` to avoid redundant fetching.
     * The `useTransferStateCondition` param can be used to control if the value in `TransferState`
     * shall be used or not. This can be useful, when you want to explicitly not use `TransferState`
     * and force a new fetching.
     * 
     * @argument T The type of the surrounding `Resolver`
     * @argument P (optional) The type of the `TypedApiSearchResponse<P>`/`TypedDocument<P>`
     * 
     * @param transferState Instance of `TransferState`
     * @param stateKey `StateKey` for identifying the resolved value
     * @param resolveObservable An `Observable` which will return `T`
     * @param useTransferStateCondition (optional) A condition to decide whether to use the `TransferState` value.
     *                                  If `true`, returns the value in `TransferState`.
     *                                  If `false`, returns the given `Observable`.
     *                                  Defaults to `true`.
     */
    static resolveWithTransferState<T extends TypedApiSearchResponse<P> | TypedDocument<P>, P = any>(
        transferState: TransferState,
        stateKey: StateKey<T>,
        resolveObservable: Observable<T>,
        useTransferStateCondition: boolean = true
    ): Observable<T> {
        if (transferState.hasKey(stateKey) && useTransferStateCondition) {
            return of(transferState.get(stateKey, undefined));
        }
        return resolveObservable.pipe(
            tap(doc => transferState.set(stateKey, doc))
        );
    }

}

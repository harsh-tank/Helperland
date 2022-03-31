"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockCustomerService = void 0;
class BlockCustomerService {
    constructor(blockCustomerRepository) {
        this.blockCustomerRepository = blockCustomerRepository;
        this.blockCustomerRepository = blockCustomerRepository;
    }
    getBlockedCustomer(ProviderId, custId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockCustomerRepository.getBlockedCustofSP(+ProviderId, +custId);
        });
    }
    getUserDetailById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockCustomerRepository.getUserDetailById(userId);
        });
    }
    updateUnBlockedCustofProvider(ProviderId, custId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockCustomerRepository.updateUnBlockedCustofProvider(+ProviderId, +custId);
        });
    }
    IsCustProviderRelated(ProviderId, custId) {
        return __awaiter(this, void 0, void 0, function* () {
            let confirm = false;
            const custIntId = +custId;
            let customers = yield this.getCompletedSRofProvider(+ProviderId);
            if (customers) {
                for (let x in customers) {
                    if (customers[x].UserId == custIntId) {
                        confirm = true;
                        break;
                    }
                    else {
                        confirm = false;
                    }
                }
            }
            else {
                confirm = false;
            }
            return confirm;
        });
    }
    getCompletedSRofProvider(ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            let cust = [];
            const ser_Req = yield this.blockCustomerRepository.getCompletedSRofProvider(ProviderId);
            if (ser_Req) {
                if (ser_Req.length > 0) {
                    for (let x in ser_Req) {
                        const user = yield this.blockCustomerRepository.getUserDetailById(ser_Req[x].UserId);
                        if (user) {
                            cust.push({ Name: user.FirstName + " " + user.LastName, UserId: user.UserId });
                        }
                    }
                }
            }
            const userIds = cust.map(o => o.UserId);
            const Result_info = cust.filter(({ UserId }, index) => !userIds.includes(UserId, index + 1));
            return Result_info;
        });
    }
    ;
    updateBlockedCustofSP(ProviderId, custId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockCustomerRepository.updateBlockedCustofSP(+ProviderId, +custId);
        });
    }
    createBlockUnblockCust(blockCustomer) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockCustomerRepository.createBlockUnblockCust(blockCustomer);
        });
    }
}
exports.BlockCustomerService = BlockCustomerService;

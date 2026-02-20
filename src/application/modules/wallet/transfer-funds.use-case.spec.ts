import { Money } from "../../../domain/value-objects/money.value-object";
import { TransferFundsUseCase } from "./transfer-funds.use-case";
import { IWalletRepository } from "../../../domain/repositories/wallet.repository.interface";
import { Wallet } from "../../../domain/entities/wallet.entity";


describe('TransferFundsUseCase', ()=>{

    let useCase: TransferFundsUseCase;
    let mockWalletRepository : jest.Mocked<IWalletRepository>;

    beforeEach(()=> {
    
        mockWalletRepository= {
            findById : jest.fn(),
            save : jest.fn()
        }

        
        useCase = new TransferFundsUseCase(mockWalletRepository);
    });

    it("deve fazer uma transferência com sucesso e salvar as duas carteiras", async ()=> {

        const carteiraOrigem =  new Wallet("origem-123", "user-A", new Money(1000));
        const carteiraDestino =  new Wallet("destino-456", "user-B", new Money(1000));

           
        mockWalletRepository.findById.mockImplementation(async (id: string) => {
        if (id === 'origem-123') return carteiraOrigem;
        if (id === 'destino-456') return carteiraDestino;
        return null;
        });


        await useCase.execute(300,'origem-123', 'destino-456');

        expect(carteiraOrigem.balance.amount).toBe(700);
        expect(carteiraDestino.balance.amount).toBe(1300);});


    it('deve lançar erro se a carteira de origem não existir', async () => {
    
    mockWalletRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute( 300, 'invalida', 'destino-456'))
      .rejects.toThrow('Carteira de origem não encontrada.');
      
    
    expect(mockWalletRepository.save).not.toHaveBeenCalled(); 
  });

it('deve repassar o erro de domínio se a origem não tiver saldo', async () => {
    const carteiraOrigem = new Wallet('origem-123', 'user-A', new Money(100)); 
    const carteiraDestino = new Wallet('destino-456', 'user-B', new Money(500));

    mockWalletRepository.findById.mockImplementation(async (id: string) => {
      if (id === 'origem-123') return carteiraOrigem;
      if (id === 'destino-456') return carteiraDestino;
      return null;
    });

    
    await expect(useCase.execute( 300,'origem-123', 'destino-456'))
      .rejects.toThrow('O valor não pode ser negativo.');

    
    expect(mockWalletRepository.save).not.toHaveBeenCalled();
  });





});

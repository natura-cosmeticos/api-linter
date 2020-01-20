import { RuleFault, Severity } from '../../../rules/rule-fault';
import { pushFault } from '../../../rules/handlers/util';

const produceMockFaults = () => ([
  {
    value: 'Mocked value',
    errors: [
      {
        severity: Severity.warning,
        message: 'Mocked warning'
      }
    ]
  }
] as RuleFault[]);

describe('pushFault function', () => {

  const mockFaultWithSameValue: RuleFault = {
    value: 'Mocked value',
    errors: [
      {
        severity: Severity.error,
        message: 'Mocked error'
      }
    ]
  };

  const mockFaultWithDifferentValue: RuleFault = {
    value: 'Mocked value but different',
    errors: [
      {
        severity: Severity.error,
        message: 'Mocked error'
      }
    ]
  };

  it('should have one fault and two errors', () => {
    const mockedFaults = produceMockFaults();
    pushFault(mockFaultWithSameValue, mockedFaults);

    expect(mockedFaults.length).toBe(1);
    expect(mockedFaults[0].errors.length).toBe(2);
  });

  it('should have two faults with one error each', () => {
    const mockedFaults = produceMockFaults();
    pushFault(mockFaultWithDifferentValue, mockedFaults);

    expect(mockedFaults.length).toBe(2);
    expect(mockedFaults[0].errors.length).toBe(1);
    expect(mockedFaults[1].errors.length).toBe(1);
  });
});

import { Controller, Get, Param } from '@nestjs/common';
import { StateEntity } from './entities/state.entity';
import { StateService } from './state.service';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async getAllState(): Promise<StateEntity[]> {
    return this.stateService.getAllState();
  }

  @Get('/:id')
  async getStateById(@Param('id') id: number): Promise<StateEntity> {
    return this.stateService.getStateById(id);
  }
}

<template>
  <v-container>
    <v-container>
      <h1>
        Endereços 
        <v-btn
          class="mx-2"
          fab
          dark
          color="indigo"
          @click="newAddress"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </h1>
    </v-container>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <template style="width: 500px">
        <v-card>
          <v-card-title>Cadastrar novo endereço</v-card-title>
          <v-card-text>
            <v-form>
              <v-container>
                <v-row no-gutters>
                  <v-col>
                    <v-text-field
                      v-model="address.zipCode"
                      placeholder="CEP"
                      label="CEP"
                      v-mask="['#####-###']"
                      outlined
                      @blur="getAddressViaCep"
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>
                    <v-text-field
                      v-model="address.address"
                      placeholder="Endereço"
                      label="Endereço"
                      outlined
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>
                    <v-text-field
                      v-model="address.district"
                      placeholder="Bairro"
                      label="Bairro"
                      outlined
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>
                    <v-text-field
                      v-model="address.addressNumber"
                      placeholder="Número"
                      label="Número"
                      v-mask="['#', '##', '###', '####', '#####', '######']"
                      outlined
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>
                    <v-text-field
                      v-model="address.complement"
                      placeholder="Complemento"
                      label="Complemento"
                      outlined
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>
                    <v-text-field
                      v-model="address.city"
                      placeholder="Cidade"
                      label="Cidade"
                      outlined
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>
                    <v-text-field
                      v-model="address.state"
                      placeholder="UF"
                      label="UF"
                      outlined
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              @click="persist"
            >
              Cadastrar
            </v-btn>
            <v-btn
              @click="dialog = false"
            >
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <v-container>
      <v-row v-for="(address, i) in addresses" :key="i">
        <v-col>
          <v-card shaped>
            <v-card-title>Endereço {{ address.id }}</v-card-title>
            <v-card-text>{{ address.address }}, {{ address.addressNumber }}, {{ address.district }}</v-card-text>
            <v-card-actions>
              <v-btn
                @click="edit(address)"
              >Editar</v-btn>
              <v-btn
                @click="destroy(address.id)"
              >Excluir</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'UserAddressesPage',

  data () {
    return {
      addresses: [],
      dialog: false,
      address: {
        id: null,
        address: null,
        district: null,
        addressNumber: null,
        complement: null,
        city: null,
        state: null,
        zipCode: null,
      }
    }
  },

  created () {
    this.getAddresses()
  },

  methods: {
    async getAddresses() {
      this.addresses = await this.$api.get('/addresses').then(res => res.data);
    },

    async destroy(id) {
      let response = await this.$api.post('/addresses/destroy', {id});
      if (response.type !== 'success') {
        return this.$toast.error(response.message)
      }
      this.$toast.success(response.message)
      this.getAddresses();
    },

    async persist () {
      let id = this.address.id || '';
      let response = await this.$api.post(`/addresses/persist/${id}`, this.address);
      if (response.type !== 'success') {
        return this.$toast.error(response.message)
      }
      this.$toast.success(response.message)
      this.dialog = false;
      this.getAddresses();
    },

    async edit (address) {
      this.dialog = true;
      this.address = address;
    },

    async newAddress () {
      this.dialog = true;
      this.address = {
        id: null,
        address: null,
        district: null,
        addressNumber: null,
        complement: null,
        city: null,
        state: null,
        zipCode: null,
      }
    },

    async getAddressViaCep() {
      let response = await this.$axios.get(`https://viacep.com.br/ws/${this.address.zipCode}/json`).then(resp => resp.data);
      this.address.address = response.logradouro;
      this.address.complement = response.complemento;
      this.address.district = response.bairro;
      this.address.city = response.localidade;
      this.address.state = response.uf;
    }
  }
}
</script>

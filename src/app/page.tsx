"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart } from 'recharts'
import { TrendingUp, TrendingDown, Users, Car, AlertTriangle, MessageSquare, Heart, Gauge, Download, Calendar as CalendarIcon, Settings, ArrowUp, ArrowDown, Target, MapPin } from 'lucide-react'
import { format, addDays, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Dados mock para demonstração
const monthlyData = [
  { month: 'Jan', pessoas: 12500, carros: 45, erros: 8, reclamacoes: 12, elogios: 35, ocupacao: 78 },
  { month: 'Fev', pessoas: 13200, carros: 47, erros: 6, reclamacoes: 9, elogios: 42, ocupacao: 82 },
  { month: 'Mar', pessoas: 14100, carros: 48, erros: 4, reclamacoes: 7, elogios: 38, ocupacao: 85 },
  { month: 'Abr', pessoas: 13800, carros: 46, erros: 9, reclamacoes: 15, elogios: 28, ocupacao: 79 },
  { month: 'Mai', pessoas: 15200, carros: 50, erros: 3, reclamacoes: 5, elogios: 45, ocupacao: 88 },
  { month: 'Jun', pessoas: 16500, carros: 52, erros: 2, reclamacoes: 4, elogios: 52, ocupacao: 92 },
  { month: 'Jul', pessoas: 15800, carros: 51, erros: 5, reclamacoes: 8, elogios: 48, ocupacao: 87 },
  { month: 'Ago', pessoas: 17200, carros: 54, erros: 1, reclamacoes: 3, elogios: 58, ocupacao: 94 },
  { month: 'Set', pessoas: 16900, carros: 53, erros: 4, reclamacoes: 6, elogios: 51, ocupacao: 91 },
  { month: 'Out', pessoas: 18100, carros: 55, erros: 2, reclamacoes: 2, elogios: 62, ocupacao: 96 },
  { month: 'Nov', pessoas: 17600, carros: 54, erros: 3, reclamacoes: 4, elogios: 55, ocupacao: 93 },
  { month: 'Dez', pessoas: 19200, carros: 57, erros: 1, reclamacoes: 1, elogios: 68, ocupacao: 98 }
]

// Dados mock para serviços/destinos
const servicosData = [
  { nome: 'Centro-Aeroporto', operacoes: 450, lucro: 85000, ocupacao: 95 },
  { nome: 'Shopping-Universidade', operacoes: 380, lucro: 72000, ocupacao: 88 },
  { nome: 'Rodoviária-Hospital', operacoes: 320, lucro: 58000, ocupacao: 82 },
  { nome: 'Bairro Norte-Centro', operacoes: 290, lucro: 45000, ocupacao: 75 },
  { nome: 'Industrial-Residencial', operacoes: 180, lucro: 32000, ocupacao: 68 }
]

// Função para gerar dados baseado no período selecionado
const generateDataForPeriod = (period: string, customStartDate?: Date, customEndDate?: Date) => {
  const today = new Date()
  let data = []
  
  switch (period) {
    case 'hoje':
      data = [{
        day: format(today, 'dd/MM', { locale: ptBR }),
        pessoas: Math.floor(Math.random() * 200) + 600,
        carros: 57,
        erros: Math.floor(Math.random() * 2),
        reclamacoes: Math.floor(Math.random() * 2),
        elogios: Math.floor(Math.random() * 5) + 15,
        ocupacao: Math.floor(Math.random() * 5) + 95
      }]
      break
      
    case 'esta-semana':
      const startWeek = startOfWeek(today, { locale: ptBR })
      for (let i = 0; i < 7; i++) {
        const date = addDays(startWeek, i)
        data.push({
          day: format(date, 'dd/MM', { locale: ptBR }),
          pessoas: Math.floor(Math.random() * 200) + 600,
          carros: 57,
          erros: Math.floor(Math.random() * 2),
          reclamacoes: Math.floor(Math.random() * 2),
          elogios: Math.floor(Math.random() * 5) + 15,
          ocupacao: Math.floor(Math.random() * 5) + 95
        })
      }
      break
      
    case 'este-mes':
      return monthlyData.slice(-1) // Apenas dezembro (mês atual)
      
    case 'ultimos-7-dias':
      for (let i = 6; i >= 0; i--) {
        const date = subDays(today, i)
        data.push({
          day: format(date, 'dd/MM', { locale: ptBR }),
          pessoas: Math.floor(Math.random() * 200) + 600,
          carros: 57,
          erros: Math.floor(Math.random() * 2),
          reclamacoes: Math.floor(Math.random() * 2),
          elogios: Math.floor(Math.random() * 5) + 15,
          ocupacao: Math.floor(Math.random() * 5) + 95
        })
      }
      break
      
    case 'ultimos-14-dias':
      for (let i = 13; i >= 0; i--) {
        const date = subDays(today, i)
        data.push({
          day: format(date, 'dd/MM', { locale: ptBR }),
          pessoas: Math.floor(Math.random() * 200) + 600,
          carros: 57,
          erros: Math.floor(Math.random() * 2),
          reclamacoes: Math.floor(Math.random() * 2),
          elogios: Math.floor(Math.random() * 5) + 15,
          ocupacao: Math.floor(Math.random() * 5) + 95
        })
      }
      break
      
    case 'ultimos-30-dias':
      for (let i = 29; i >= 0; i--) {
        const date = subDays(today, i)
        data.push({
          day: format(date, 'dd/MM', { locale: ptBR }),
          pessoas: Math.floor(Math.random() * 200) + 600,
          carros: 57,
          erros: Math.floor(Math.random() * 2),
          reclamacoes: Math.floor(Math.random() * 2),
          elogios: Math.floor(Math.random() * 5) + 15,
          ocupacao: Math.floor(Math.random() * 5) + 95
        })
      }
      break
      
    case 'ultimos-6-meses':
      return monthlyData.slice(-6) // Últimos 6 meses
      
    case 'personalizado':
      if (customStartDate && customEndDate) {
        const diffTime = Math.abs(customEndDate.getTime() - customStartDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        for (let i = 0; i <= diffDays; i++) {
          const date = addDays(customStartDate, i)
          data.push({
            day: format(date, 'dd/MM', { locale: ptBR }),
            pessoas: Math.floor(Math.random() * 200) + 600,
            carros: 57,
            erros: Math.floor(Math.random() * 2),
            reclamacoes: Math.floor(Math.random() * 2),
            elogios: Math.floor(Math.random() * 5) + 15,
            ocupacao: Math.floor(Math.random() * 5) + 95
          })
        }
      } else {
        // Se não há datas personalizadas, retorna dados do mês atual
        return monthlyData.slice(-1)
      }
      break
      
    default:
      return monthlyData
  }
  
  return data
}

const exportToPDF = async () => {
  try {
    const { jsPDF } = await import('jspdf')
    const html2canvas = (await import('html2canvas')).default
    
    const element = document.getElementById('dashboard-content')
    if (!element) return
    
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    })
    
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('l', 'mm', 'a4')
    
    const imgWidth = 297
    const pageHeight = 210
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    
    let position = 0
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }
    
    pdf.save(`dashboard-sim7-${format(new Date(), 'yyyy-MM-dd')}.pdf`)
  } catch (error) {
    console.error('Erro ao exportar PDF:', error)
    alert('Erro ao exportar PDF. Tente novamente.')
  }
}

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('este-mes')
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [customStartDate, setCustomStartDate] = useState<Date | undefined>()
  const [customEndDate, setCustomEndDate] = useState<Date | undefined>()
  const [isSelectingStartDate, setIsSelectingStartDate] = useState(true)

  // Determinar dados baseado no período selecionado
  const getCurrentData = () => {
    return generateDataForPeriod(selectedPeriod, customStartDate, customEndDate)
  }

  const currentData = getCurrentData()
  const currentPeriod = currentData[currentData.length - 1]
  const previousPeriod = currentData[currentData.length - 2]

  // Indicadores com cores psicologicamente selecionadas
  const indicators = [
    {
      title: 'Pessoas Transportadas',
      value: currentPeriod.pessoas.toLocaleString(),
      change: previousPeriod ? ((currentPeriod.pessoas - previousPeriod.pessoas) / previousPeriod.pessoas * 100).toFixed(1) : '0',
      icon: Users,
      color: '#3B82F6', // Azul confiança
      bgColor: '#EFF6FF',
      borderColor: '#3B82F6'
    },
    {
      title: 'Carros Operados',
      value: currentPeriod.carros.toString(),
      change: previousPeriod ? ((currentPeriod.carros - previousPeriod.carros) / previousPeriod.carros * 100).toFixed(1) : '0',
      icon: Car,
      color: '#10B981', // Verde produtividade
      bgColor: '#ECFDF5',
      borderColor: '#10B981'
    },
    {
      title: 'Erros Operacionais',
      value: currentPeriod.erros.toString(),
      change: previousPeriod ? ((currentPeriod.erros - previousPeriod.erros) / (previousPeriod.erros || 1) * 100).toFixed(1) : '0',
      icon: AlertTriangle,
      color: '#EF4444', // Vermelho urgência
      bgColor: '#FEF2F2',
      borderColor: '#EF4444',
      inverse: true
    },
    {
      title: 'Reclamações',
      value: currentPeriod.reclamacoes.toString(),
      change: previousPeriod ? ((currentPeriod.reclamacoes - previousPeriod.reclamacoes) / (previousPeriod.reclamacoes || 1) * 100).toFixed(1) : '0',
      icon: MessageSquare,
      color: '#F59E0B', // Laranja atenção
      bgColor: '#FFFBEB',
      borderColor: '#F59E0B',
      inverse: true
    },
    {
      title: 'Elogios',
      value: currentPeriod.elogios.toString(),
      change: previousPeriod ? ((currentPeriod.elogios - previousPeriod.elogios) / previousPeriod.elogios * 100).toFixed(1) : '0',
      icon: Heart,
      color: '#EC4899', // Rosa motivação
      bgColor: '#FDF2F8',
      borderColor: '#EC4899'
    },
    {
      title: 'Ocupação dos Carros',
      value: `${currentPeriod.ocupacao}%`,
      change: previousPeriod ? ((currentPeriod.ocupacao - previousPeriod.ocupacao) / previousPeriod.ocupacao * 100).toFixed(1) : '0',
      icon: Gauge,
      color: '#8B5CF6', // Roxo eficiência
      bgColor: '#F5F3FF',
      borderColor: '#8B5CF6'
    }
  ]

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'hoje':
        return 'Hoje'
      case 'esta-semana':
        return 'Esta semana'
      case 'este-mes':
        return 'Este mês'
      case 'ultimos-7-dias':
        return 'Últimos 7 dias'
      case 'ultimos-14-dias':
        return 'Últimos 14 dias'
      case 'ultimos-30-dias':
        return 'Últimos 30 dias'
      case 'ultimos-6-meses':
        return 'Últimos 6 meses'
      case 'personalizado':
        if (customStartDate && customEndDate) {
          return `${format(customStartDate, 'dd/MM/yy')} - ${format(customEndDate, 'dd/MM/yy')}`
        }
        return 'Período personalizado'
      default:
        return 'Este mês'
    }
  }

  const getDataKey = () => {
    if (selectedPeriod === 'ultimos-6-meses' || selectedPeriod === 'este-mes') {
      return 'month'
    }
    return 'day'
  }

  const handlePeriodChange = (newPeriod: string) => {
    setSelectedPeriod(newPeriod)
    if (newPeriod !== 'personalizado') {
      setCustomStartDate(undefined)
      setCustomEndDate(undefined)
    }
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return

    if (isSelectingStartDate) {
      setCustomStartDate(date)
      setCustomEndDate(undefined)
      setIsSelectingStartDate(false)
    } else {
      if (customStartDate && date >= customStartDate) {
        setCustomEndDate(date)
        setIsSelectingStartDate(true)
      } else {
        // Se a data final é anterior à inicial, redefine
        setCustomStartDate(date)
        setCustomEndDate(undefined)
        setIsSelectingStartDate(false)
      }
    }
  }

  const resetCustomDates = () => {
    setCustomStartDate(undefined)
    setCustomEndDate(undefined)
    setIsSelectingStartDate(true)
  }

  const applyPeriodFilter = () => {
    setIsCalendarOpen(false)
    // Os dados são atualizados automaticamente através do getCurrentData()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto p-6 space-y-8" id="dashboard-content">
        {/* Header com Logo - Estilo Moderno */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-6">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/24336bf1-cdc1-48ed-b7d2-d8b3150e37db.png" 
                alt="Logo Sim7" 
                className="h-16 w-auto"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Dashboard Sim7
                </h1>
                <p className="text-gray-600 mt-1">
                  Indicadores Operacionais - {format(new Date(), 'MMMM yyyy', { locale: ptBR })}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 bg-white border-gray-300 hover:bg-gray-50">
                    <CalendarIcon className="w-4 h-4" />
                    {getPeriodLabel()}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="period-select">Selecionar Período</Label>
                      <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha o período" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hoje">Hoje</SelectItem>
                          <SelectItem value="esta-semana">Esta semana</SelectItem>
                          <SelectItem value="este-mes">Este mês</SelectItem>
                          <SelectItem value="ultimos-7-dias">Últimos 7 dias</SelectItem>
                          <SelectItem value="ultimos-14-dias">Últimos 14 dias</SelectItem>
                          <SelectItem value="ultimos-30-dias">Últimos 30 dias</SelectItem>
                          <SelectItem value="ultimos-6-meses">Últimos 6 meses</SelectItem>
                          <SelectItem value="personalizado">Período personalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedPeriod === 'personalizado' && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label className="text-sm font-medium">
                            {isSelectingStartDate ? 'Selecione a data de início:' : 'Selecione a data de fim:'}
                          </Label>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={resetCustomDates}
                            className="text-xs"
                          >
                            Limpar
                          </Button>
                        </div>
                        
                        {customStartDate && (
                          <div className="text-sm text-gray-600">
                            <strong>Início:</strong> {format(customStartDate, 'dd/MM/yyyy', { locale: ptBR })}
                          </div>
                        )}
                        
                        {customEndDate && (
                          <div className="text-sm text-gray-600">
                            <strong>Fim:</strong> {format(customEndDate, 'dd/MM/yyyy', { locale: ptBR })}
                          </div>
                        )}
                        
                        <Calendar
                          mode="single"
                          selected={isSelectingStartDate ? customStartDate : customEndDate}
                          onSelect={handleDateSelect}
                          className="rounded-md border"
                          locale={ptBR}
                          disabled={(date) => date > new Date()}
                        />
                        
                        <div className="text-xs text-gray-500">
                          {isSelectingStartDate 
                            ? 'Primeiro, selecione a data de início' 
                            : 'Agora selecione a data de fim'
                          }
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      onClick={applyPeriodFilter} 
                      className="w-full"
                      disabled={selectedPeriod === 'personalizado' && (!customStartDate || !customEndDate)}
                    >
                      Aplicar Filtro
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Button onClick={exportToPDF} className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4" />
                Exportar PDF
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Cards Modernos - Linha Colorida Mais Grossa no Topo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon
            const isPositive = indicator.inverse ? 
              parseFloat(indicator.change) < 0 : 
              parseFloat(indicator.change) > 0
            
            return (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl overflow-hidden relative">
                {/* Barra colorida no topo - MAIS GROSSA (8px) */}
                <div 
                  className="absolute top-0 left-0 right-0 w-full"
                  style={{ 
                    backgroundColor: indicator.borderColor,
                    height: '8px'
                  }}
                />
                
                <CardContent className="p-6 pt-8">
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="p-3 rounded-xl shadow-sm"
                      style={{ backgroundColor: indicator.bgColor }}
                    >
                      <Icon 
                        className="w-6 h-6" 
                        style={{ color: indicator.color }}
                      />
                    </div>
                    
                    {/* Badge de mudança */}
                    <div 
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        isPositive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {isPositive ? (
                        <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowDown className="w-3 h-3" />
                      )}
                      <span>{Math.abs(parseFloat(indicator.change))}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">
                      {indicator.title}
                    </h3>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {indicator.value}
                    </div>
                    <p className="text-xs text-gray-500">
                      vs período anterior
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 4 Categorias de Análise - Cards Brancos Modernos */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <Tabs defaultValue="visao-geral" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger value="visao-geral" className="rounded-lg font-medium">1. Visão Geral</TabsTrigger>
              <TabsTrigger value="transporte" className="rounded-lg font-medium">2. Transporte</TabsTrigger>
              <TabsTrigger value="qualidade" className="rounded-lg font-medium">3. Qualidade</TabsTrigger>
              <TabsTrigger value="destino" className="rounded-lg font-medium">4. Destino</TabsTrigger>
            </TabsList>

            {/* 1. Visão Geral - Todos os insights */}
            <TabsContent value="visao-geral" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-sm border-0 rounded-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="w-5 h-5 text-blue-600" />
                      Pessoas Transportadas
                    </CardTitle>
                    <CardDescription>Evolução do número de passageiros - {getPeriodLabel()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={currentData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey={getDataKey()} />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [value.toLocaleString(), 'Pessoas']}
                          labelStyle={{ color: '#374151' }}
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="pessoas" 
                          stroke="#3B82F6" 
                          fill="url(#colorPessoas)" 
                          strokeWidth={2}
                        />
                        <defs>
                          <linearGradient id="colorPessoas" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-0 rounded-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="w-5 h-5 text-purple-600" />
                      Resumo de Todos os Indicadores
                    </CardTitle>
                    <CardDescription>Visão consolidada dos KPIs - {getPeriodLabel()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={currentData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey={getDataKey()} />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Bar yAxisId="left" dataKey="carros" fill="#10B981" name="Carros" radius={[4, 4, 0, 0]} />
                        <Line yAxisId="right" type="monotone" dataKey="ocupacao" stroke="#8B5CF6" strokeWidth={2} name="Ocupação %" />
                        <Line yAxisId="left" type="monotone" dataKey="elogios" stroke="#EC4899" strokeWidth={2} name="Elogios" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 2. Transporte - Carros Operados vs Ocupação Média */}
            <TabsContent value="transporte" className="space-y-6">
              <Card className="shadow-sm border-0 rounded-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Car className="w-5 h-5 text-green-600" />
                    Carros Operados vs Ocupação Média
                  </CardTitle>
                  <CardDescription>Análise da eficiência operacional - {getPeriodLabel()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={currentData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey={getDataKey()} />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" domain={[70, 100]} />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'carros' ? value : `${value}%`, 
                          name === 'carros' ? 'Carros Operados' : 'Ocupação Média'
                        ]}
                      />
                      <Bar yAxisId="left" dataKey="carros" fill="#10B981" name="carros" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="ocupacao" stroke="#8B5CF6" strokeWidth={3} name="ocupacao" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 3. Qualidade - Elogios vs Reclamações + Erros vs Pessoas */}
            <TabsContent value="qualidade" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-sm border-0 rounded-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Heart className="w-5 h-5 text-pink-600" />
                      Elogios vs Reclamações
                    </CardTitle>
                    <CardDescription>Comparativo do feedback dos usuários - {getPeriodLabel()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={currentData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey={getDataKey()} />
                        <YAxis />
                        <Tooltip 
                          formatter={(value, name) => [value, name === 'elogios' ? 'Elogios' : 'Reclamações']}
                        />
                        <Bar dataKey="elogios" fill="#EC4899" radius={[4, 4, 0, 0]} name="Elogios" />
                        <Bar dataKey="reclamacoes" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Reclamações" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-0 rounded-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      Erros Operacionais vs Pessoas Transportadas
                    </CardTitle>
                    <CardDescription>Relação entre volume e qualidade - {getPeriodLabel()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={currentData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey={getDataKey()} />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Bar yAxisId="right" dataKey="pessoas" fill="#3B82F6" opacity={0.6} name="Pessoas" radius={[4, 4, 0, 0]} />
                        <Line yAxisId="left" type="monotone" dataKey="erros" stroke="#EF4444" strokeWidth={3} name="Erros" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 4. Destino - Serviços mais operados vs que mais lucram */}
            <TabsContent value="destino" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-sm border-0 rounded-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                      Serviços Mais Operados
                    </CardTitle>
                    <CardDescription>Ranking por número de operações</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={servicosData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis type="number" />
                        <YAxis dataKey="nome" type="category" width={120} />
                        <Tooltip formatter={(value) => [value, 'Operações']} />
                        <Bar dataKey="operacoes" fill="#4F46E5" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-0 rounded-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Serviços que Mais Lucram
                    </CardTitle>
                    <CardDescription>Ranking por lucro gerado (R$)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={servicosData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis type="number" />
                        <YAxis dataKey="nome" type="category" width={120} />
                        <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, 'Lucro']} />
                        <Bar dataKey="lucro" fill="#10B981" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Resumo Detalhado por Data - Card Branco Moderno */}
        <Card className="shadow-lg border-0 rounded-2xl bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Resumo Detalhado - {getPeriodLabel()}</CardTitle>
            <CardDescription>Dados dia por dia de cada indicador conforme filtro aplicado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 font-semibold text-gray-700 bg-gray-50 rounded-tl-lg">
                      Data/Período
                    </th>
                    <th className="text-right p-4 font-semibold text-gray-700 bg-gray-50">Pessoas Transportadas</th>
                    <th className="text-right p-4 font-semibold text-gray-700 bg-gray-50">Carros Operados</th>
                    <th className="text-right p-4 font-semibold text-gray-700 bg-gray-50">Erros Operacionais</th>
                    <th className="text-right p-4 font-semibold text-gray-700 bg-gray-50">Reclamações</th>
                    <th className="text-right p-4 font-semibold text-gray-700 bg-gray-50">Elogios</th>
                    <th className="text-right p-4 font-semibold text-gray-700 bg-gray-50 rounded-tr-lg">Ocupação dos Carros</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((data, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">
                        {data.month || data.day}
                      </td>
                      <td className="p-4 text-right text-gray-700">{data.pessoas.toLocaleString()}</td>
                      <td className="p-4 text-right text-gray-700">{data.carros}</td>
                      <td className="p-4 text-right text-gray-700">{data.erros}</td>
                      <td className="p-4 text-right text-gray-700">{data.reclamacoes}</td>
                      <td className="p-4 text-right text-gray-700">{data.elogios}</td>
                      <td className="p-4 text-right text-gray-700">{data.ocupacao}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
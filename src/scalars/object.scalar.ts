
import { Scalar } from '@nestjs/graphql'
import { Kind, ASTNode } from 'graphql'

@Scalar('Object')
export class ObjectScalar {
  description = 'Object custom scalar type'

  parseValue(value: object | string) {
    return typeof value === 'object' ? value
      : typeof value === 'string' ? JSON.parse(value)
      : null
  }

  serialize(value: object | string) {
    return typeof value === 'object' ? value
      : typeof value === 'string' ? JSON.parse(value)
      : null
  }

  parseLiteral(ast: ASTNode) {
    switch (ast.kind) {
      case Kind.STRING: return JSON.parse(ast.value)
      case Kind.OBJECT: throw new Error(`Not sure what to do with OBJECT for ObjectScalarType`)
      default: return null
    }
  }
}
